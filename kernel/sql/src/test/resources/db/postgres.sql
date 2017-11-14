/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

CREATE TABLE IF NOT EXISTS docs (
  id int check (id > 0) NOT NULL,
  rev int check (rev > 0) NOT NULL,
  content varchar(200) NOT NULL,
  PRIMARY KEY (id,rev)
);

INSERT INTO docs (id, rev, content) VALUES
  ('1', '1', 'The earth is flat'),
  ('2', '1', 'One hundred angels can dance on the head of a pin'),
  ('1', '2', 'The earth is flat and rests on a bulls horn'),
  ('1', '3', 'The earth is like a ball.')