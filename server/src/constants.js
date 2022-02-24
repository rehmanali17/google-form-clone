const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    PROCESS_EXIT: 1,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
};

const ALERTS = {
    SERVER_RUNNING: (port) => `Server is running at port:${port}`,
    FORM_SCHEMA: {
        QUESTION: 'Question is required',
        TYPE: 'Question type is required',
        TITLE: {
            REQUIRED: 'Form title is required',
            VALID: 'Enter a valid form title',
        },
        DESCRIPTION: {
            REQUIRED: 'Form description is required',
            VALID: 'Enter a valid form description',
        },
        STATUS: 'Form status is required',
    },
    USER_SCHEMA: {
        NAME: 'Name is required',
        EMAIL: 'Email is required',
        PICTURE_URL: 'Picture is required',
    },
    AUTHORIZATION_FAILED: 'Google authorization failed',
    AUTHENTICATION_FAILED: 'Google authentication failed',
    UNAUTHORIZED: 'User is not authorized',
    EXPIRED_TOKEN: 'Token is expired',
    ERROR_SAVING_USER: 'Error while adding the user in the database',
    UNKNOWN_ERROR: 'An unknown error occured',
    NO_USER: 'User does not exist',
    ERROR_SAVING_FORM: 'Error saving the form',
    FORM_FETCH_ERROR: 'Error retreiving the forms',
    FORM_REMOVE_SUCCESS: 'Form removed successfully',
    FORM_REMOVE_FAIL: 'Error removing the form',
    FORM_RENAME_SUCCESS: 'Form renamed successfully',
    FORM_RENAME_FAIL: 'Error renaming the form',
    FORM_STATUS_UPDATE_SUCCESS: 'Published successfully',
    FORM_STATUS_UPDATE_FAIL: 'Error publishing the form',
    FORM_EDIT_SUCCESS: 'updated successfully',
    FORM_EDIT_FAIL: 'Error updating the form',
    FORM_IMAGES_FETCH_ERROR: 'Error fetching the form images',
};

module.exports = { STATUS_CODES, ALERTS };
