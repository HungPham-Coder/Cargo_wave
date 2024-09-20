// import apiCode from './apiCodes';

// const retrieveDataSuccessCode = 300;
// const createSuccessCode = 302;
// const updateSuccessCode = 303;
// const deleteSuccessCode = 304;
// const updateStatusSuccessCode = 305;

// // Define the type for the error object
// interface ErrorResponse {
//   response?: {
//     data?: {
//       code: number;
//     };
//   };
// }

// // Define the type for the data returned by successComposer
// interface SuccessData {
//   data?: any;
// }

// // Type for the errorComposer return type
// interface ErrorComposerResult {
//   code: number;
//   errorMessage: string;
// }

// // Type for the successComposer return type
// interface SuccessComposerResult {
//   code: number;
//   message: string;
//   data: any;
// }

// // Error Composer function
// const errorComposer = (error: ErrorResponse): ErrorComposerResult => {
//   if (error?.response?.data) {
//     const { code } = error.response.data;
//     return {
//       code,
//       errorMessage: apiCode[code] || 'Unknown error code',
//     };
//   }
//   return {
//     errorMessage: 'Có lỗi xảy ra',
//     code: -1,
//   };
// };

// // Success Composer function
// const successComposer = (messageId: number, data?: SuccessData): SuccessComposerResult => {
//   return {
//     code: 0,
//     message: apiCode[messageId] || 'Unknown message ID',
//     data: data?.data || data,
//   };
// };

// export { errorComposer, successComposer };
