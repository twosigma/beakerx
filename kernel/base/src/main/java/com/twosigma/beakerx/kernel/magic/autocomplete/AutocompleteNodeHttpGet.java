/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.beakerx.kernel.magic.autocomplete;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twosigma.beakerx.autocomplete.AutocompleteNode;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import org.apache.http.client.fluent.Request;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.fasterxml.jackson.databind.SerializationFeature.WRITE_ENUMS_USING_TO_STRING;

public class AutocompleteNodeHttpGet extends AutocompleteNode {

  public static final String HTTPS_SEARCH_MAVEN_ORG_SOLRSEARCH_SELECT_Q_S_START_0_ROWS_20 = "https://search.maven.org/solrsearch/select?q=%s&start=0&rows=20";
  public static final String SPACE = "%20";

  private final ObjectMapper objectMapper;

  public AutocompleteNodeHttpGet(String name, List<AutocompleteNode> children) {
    super(name, children);
    this.objectMapper = new ObjectMapper();
    this.objectMapper.enable(WRITE_ENUMS_USING_TO_STRING);
  }


  @Override
  public Optional<AutocompleteResult> findNextWord(String text, LinkedList<String> parts) {
    return Optional.empty();
  }

  @Override
  public Optional<AutocompleteResult> matchToTheWord(String text, LinkedList<String> parts, String last) {
    try {
      Map result = getResult(parts, last);
      if (result.containsKey("response")) {
        Map response = (Map) result.get("response");
        if ((response.containsKey("docs")) && ((List) response.get("docs")).size() > 0) {
          return createResult(text, parts, last, response);
        } else {
          Optional<String> suggestion = getSuggestion(result);
          if (suggestion.isPresent()) {
            Map fromSuggestion = getResult(new LinkedList<>(), suggestion.get());
            if (fromSuggestion.containsKey("response")) {
              Map responseFromSuggestion = (Map) fromSuggestion.get("response");
              if ((responseFromSuggestion.containsKey("docs")) && ((List) responseFromSuggestion.get("docs")).size() > 0) {
                return createResult(text, parts, last, responseFromSuggestion);
              }
            }
          }
        }
      }
      return Optional.empty();
    } catch (Exception e) {
      return Optional.empty();
    }
  }

  private Optional<String> getSuggestion(Map result) {
    if (result.containsKey("spellcheck")) {
      Map spellcheck = (Map) result.get("spellcheck");
      if (spellcheck.containsKey("suggestions")) {
        List suggestions = (List) spellcheck.get("suggestions");
        if (suggestions.size() > 1) {
          Map suggestionOption = (Map) suggestions.get(1);
          if (suggestionOption.containsKey("suggestion")) {
            List suggestion = (List) suggestionOption.get("suggestion");
            if (suggestion.size() > 0) {
              return Optional.of((String) suggestion.get(0));
            }
          }
        }
      }
    }
    return Optional.empty();
  }

  private Optional<AutocompleteResult> createResult(String text, LinkedList<String> parts, String last, Map response) {
    List docs = (List) response.get("docs");
    List<String> collect = (List<String>) docs.stream()
            .map(x -> {
              Map doc = (Map) x;
              return doc.get("g") + " " + doc.get("a") + " " + doc.get("latestVersion");
            })
            .collect(Collectors.toList());

    if (!collect.isEmpty()) {
      return Optional.of(new AutocompleteResult(collect, text.length() - lengthOfCoordinates(parts, last)));
    }
    return Optional.empty();
  }

  private int lengthOfCoordinates(LinkedList<String> parts, String last) {
    return parts.stream().mapToInt(x -> x.length() + 1).sum() + last.length();
  }

  private Map getResult(LinkedList<String> parts, String last) throws IOException {
    String uri = getUrl(parts, last);
    String valueString = Request
            .Get(uri)
            .execute()
            .returnContent()
            .asString();
    return fromJson(valueString);
  }

  private Map fromJson(String json) {
    try {
      return objectMapper.readValue(json, Map.class);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @NotNull
  private String getUrl(LinkedList<String> parts, String last) {
    if (parts.size() == 2) {
      String encode = parts.get(0) + SPACE + parts.get(1) + SPACE + last;
      return String.format(HTTPS_SEARCH_MAVEN_ORG_SOLRSEARCH_SELECT_Q_S_START_0_ROWS_20, encode);
    } else if (parts.size() == 1) {
      String encode = parts.get(0) + SPACE + last;
      return String.format(HTTPS_SEARCH_MAVEN_ORG_SOLRSEARCH_SELECT_Q_S_START_0_ROWS_20, encode);
    } else if (parts.size() == 0) {
      String encode = last;
      return String.format(HTTPS_SEARCH_MAVEN_ORG_SOLRSEARCH_SELECT_Q_S_START_0_ROWS_20, encode);
    }
    return "";
  }
}
