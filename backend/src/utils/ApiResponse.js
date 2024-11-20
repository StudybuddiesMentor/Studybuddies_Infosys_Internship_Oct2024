class ApiResponse {
    /**
     * @description A class for generating consistent API responses.
     * @param {number} statusCode - The HTTP status code for the response (e.g., 200, 404, 500).
     * @param {Object} data - The data to be sent in the response. This could be an object, array, or null.
     * @param {string} message - A custom message describing the result (default: "Success").
     * @param {Object} [metadata] - Additional information such as pagination data, timestamps, etc.
     */
    constructor(statusCode, data, message = "Success", metadata = null) {
        // Validate that the statusCode is a valid HTTP status code.
        if (typeof statusCode !== 'number' || statusCode < 100 || statusCode > 599) {
            throw new Error('Invalid HTTP status code');
        }

        // Assign the properties to the instance.
        this.statusCode = statusCode;
        this.data = data || null; // Ensuring data defaults to null if not provided.
        this.message = message;
        this.metadata = metadata || null; // Optional metadata for extra info like pagination.
        this.success = statusCode < 400; // Mark the response as successful if the statusCode is less than 400.
    }

    /**
     * @description A method to return the API response in JSON format.
     * @returns {Object} The API response in JSON format.
     */
    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
            success: this.success,
            ...(this.metadata && { metadata: this.metadata }) // Include metadata if it exists.
        };
    }

    /**
     * @description Generate an error response (useful for error handling).
     * @param {string} errorMessage - The error message to include in the response.
     * @param {Object} [errorData] - Optional additional error data (e.g., validation errors).
     * @param {Object} [metadata] - Optional metadata (e.g., request ID, or other additional info).
     * @returns {ApiResponse} An ApiResponse instance formatted for errors.
     */
    static error(errorMessage, errorData = null, metadata = null) {
        return new ApiResponse(500, errorData, errorMessage, metadata);
    }

    /**
     * @description Generate a success response (useful for general success responses).
     * @param {Object} successData - The data to include in the success response.
     * @param {string} successMessage - The success message (default: "Success").
     * @param {Object} [metadata] - Optional metadata (e.g., pagination or other info).
     * @returns {ApiResponse} An ApiResponse instance formatted for success.
     */
    static success(successData, successMessage = "Success", metadata = null) {
        return new ApiResponse(200, successData, successMessage, metadata);
    }

    /**
     * @description Generate a not found response.
     * @param {string} notFoundMessage - The message indicating the resource was not found.
     * @param {Object} [metadata] - Optional metadata to provide additional context.
     * @returns {ApiResponse} An ApiResponse instance formatted for a not found response.
     */
    static notFound(notFoundMessage = "Resource not found", metadata = null) {
        return new ApiResponse(404, null, notFoundMessage, metadata);
    }

    /**
     * @description Generate an unauthorized response.
     * @param {string} unauthorizedMessage - The message indicating the user is unauthorized.
     * @param {Object} [metadata] - Optional metadata.
     * @returns {ApiResponse} An ApiResponse instance formatted for unauthorized access.
     */
    static unauthorized(unauthorizedMessage = "Unauthorized access", metadata = null) {
        return new ApiResponse(401, null, unauthorizedMessage, metadata);
    }

    /**
     * @description Generate a bad request response.
     * @param {string} badRequestMessage - The message indicating a bad request was made.
     * @param {Object} [errorDetails] - Optional error details (e.g., validation errors).
     * @param {Object} [metadata] - Optional metadata.
     * @returns {ApiResponse} An ApiResponse instance formatted for a bad request response.
     */
    static badRequest(badRequestMessage = "Bad Request", errorDetails = null, metadata = null) {
        return new ApiResponse(400, errorDetails, badRequestMessage, metadata);
    }

    /**
     * @description Generate a server error response.
     * @param {string} errorMessage - The message indicating a server error.
     * @param {Object} [errorDetails] - Optional details about the error.
     * @param {Object} [metadata] - Optional metadata.
     * @returns {ApiResponse} An ApiResponse instance formatted for an internal server error.
     */
    static serverError(errorMessage = "Internal Server Error", errorDetails = null, metadata = null) {
        return new ApiResponse(500, errorDetails, errorMessage, metadata);
    }
}

export default ApiResponse;
