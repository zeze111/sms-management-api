export const contactRules = {
  name: 'required|alpha|between:2,40',
  number: 'required|numeric|digits:9',
};

export const textRules = {
  message: 'required|alpha|min:1',
  receiver: 'required|numeric|digits:9',
};
