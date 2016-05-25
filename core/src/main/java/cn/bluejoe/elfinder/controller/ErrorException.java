package cn.bluejoe.elfinder.controller;

/**
 * This Exception is thrown when the implementation can't complete and wants to return an error to the client.
 */
public class ErrorException extends RuntimeException
{

    private final String error;
    private final String[] args;

    /**
     * See /elfinder/js/i18n/elfinder.??.js for error codes.
     * @param error The error code.
     * @param args Any arguments needed by the error message.
     */
    public ErrorException(String error, String... args)
    {
        this.error = error;
        this.args = args;
    }

    /**
     * @return The error code that will translated by elfinder to a nice message.
     */
    public String getError()
    {
        return error;
    }

    /**
     * @return The arguments needed by the error message.
     */
    public String[] getArgs()
    {
        return args;
    }
}
