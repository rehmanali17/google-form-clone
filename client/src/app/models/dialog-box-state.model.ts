export interface DialogBoxState {
    deleteDialogBox: {
        status: boolean;
        id: string;
        title: string;
    };
    editDialogBox: {
        status: boolean;
        id: string;
        title: string;
    };
    formDialogBox: {
        status: boolean;
        isError: boolean;
        title: string;
        message: string;
    };
}
