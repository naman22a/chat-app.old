import { FieldError } from '../api/types';

const mapToErrors = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};

    for (const error of errors) {
        errorMap[error.field] = error.message;
    }

    return errorMap;
};
export default mapToErrors;
