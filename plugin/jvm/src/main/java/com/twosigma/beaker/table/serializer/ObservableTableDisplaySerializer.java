package com.twosigma.beaker.table.serializer;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.twosigma.beaker.jvm.updater.UpdateManager;
import com.twosigma.beaker.table.ObservableTableDisplay;
import com.twosigma.beaker.table.action.TableDisplayObjectManager;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;

import java.io.IOException;

public abstract class ObservableTableDisplaySerializer<T extends ObservableTableDisplay> extends JsonSerializer<T> {
  @Inject
  private Provider<TableDisplayObjectManager> tableObjectManagerProvider;
  @Inject
  private Provider<UpdateManager> updateManagerProvider;

  protected void serialize(T tableDisplay, JsonGenerator jgen) throws IOException {
    String id = updateManagerProvider.get().register(tableDisplay);
    tableObjectManagerProvider.get().registerTableDisplay(id, tableDisplay);
    jgen.writeStringField("update_id", id);
    jgen.writeBooleanField("hasDoubleClickAction", tableDisplay.hasDoubleClickAction());
    jgen.writeStringField("doubleClickTag", tableDisplay.getDoubleClickTag());
    jgen.writeObjectField("contextMenuItems", tableDisplay.getContextMenuItems());
    jgen.writeObjectField("contextMenuTags", tableDisplay.getContextMenuTags());
  }

}
