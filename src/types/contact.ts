type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = {
  [key in keyof ContactFormValues]: boolean;
};

export type { ContactFormErrors, ContactFormValues };
