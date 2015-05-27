package com.twosigma.beaker.easyform;

public class EasyFormComponent {

    private boolean enabled;
    //Acts like ID
    private String label;

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(final boolean enabled) {
        this.enabled = enabled;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(final String label) {
        this.label = label;
    }
}
