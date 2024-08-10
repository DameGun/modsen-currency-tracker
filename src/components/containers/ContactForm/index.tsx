import { ChangeEvent, Component, FormEvent } from 'react';

import './styles.scss';
import { FormField } from '@/components/containers';
import { Button, Input, TextArea } from '@/components/ui';
import { EMAIL_VALIDATION_PATTERN, TEXT_AREA_MAX_LENGTH } from '@/constants/misc';
import type { ContactFormErrors, ContactFormValues } from '@/types/contact';
import type { INotifier } from '@/types/observable';
import { ObserveableActionType } from '@/types/observable';
import { sendEmail } from '@/utils/contact';

interface ContactFormProps extends INotifier<string> {}

interface ContactFormState {
  errors: ContactFormErrors;
  values: ContactFormValues;
}

export default class ContactForm extends Component<ContactFormProps, ContactFormState> {
  formInitialValues: ContactFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  };

  errorsInitialValule: ContactFormErrors = {
    firstName: false,
    lastName: false,
    email: false,
    subject: false,
    message: false,
  };

  constructor(props: ContactFormProps) {
    super(props);

    this.state = {
      errors: this.errorsInitialValule,
      values: this.formInitialValues,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  async handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = this.validate();
    const values = this.state.values;

    if (!Object.values(errors).includes(true)) {
      try {
        await sendEmail(values);

        this.props.notify(
          `Your request for subject ${values.subject} was accepted!`,
          ObserveableActionType.notify
        );

        this.resetForm();
      } catch (err) {
        this.props.notify(
          `Some error happened while trying to send email!`,
          ObserveableActionType.notify
        );
      }
    }

    this.setState({ errors });
  }

  handleValueChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const inputId = e.target.id;
    const value = e.target.value;

    this.setState((state) => ({
      values: { ...state.values, [inputId]: value },
    }));
  }

  validate() {
    const errors: ContactFormErrors = { ...this.errorsInitialValule };
    const values = this.state.values;
    let key: keyof ContactFormValues;

    for (key in values) {
      if (values[key] === '' || (key === 'email' && !EMAIL_VALIDATION_PATTERN.test(values[key]))) {
        errors[key] = true;
      }
    }

    return errors;
  }

  resetForm() {
    this.setState({
      values: { ...this.formInitialValues },
    });
  }

  render() {
    return (
      <form className='contact-form' onSubmit={this.handleFormSubmit}>
        <FormField
          labelText='First Name'
          isValidationFailed={this.state.errors.firstName}
          errorText='First name is required'
        >
          <Input
            id='firstName'
            name='firstName'
            placeholder='e.g. John'
            autoComplete='off'
            onChange={this.handleValueChange}
          />
        </FormField>
        <FormField
          labelText='Last Name'
          isValidationFailed={this.state.errors.lastName}
          errorText='Last name is required'
        >
          <Input
            id='lastName'
            name='lastName'
            placeholder='e.g. Johnson'
            autoComplete='off'
            onChange={this.handleValueChange}
          />
        </FormField>
        <FormField
          labelText='Email'
          isValidationFailed={this.state.errors.email}
          errorText='Invalid Email'
        >
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='e.g. currency@gmail.com'
            onChange={this.handleValueChange}
          />
        </FormField>
        <FormField
          labelText='Subject'
          isValidationFailed={this.state.errors.subject}
          errorText='Subject is required'
        >
          <Input
            id='subject'
            name='subject'
            placeholder='Your issue of suggestion'
            autoComplete='off'
            onChange={this.handleValueChange}
          />
        </FormField>
        <FormField
          className='contact-form__message'
          labelText='Message'
          isValidationFailed={this.state.errors.message}
          errorText='Message is required'
        >
          <TextArea
            id='message'
            name='message'
            placeholder='Your message'
            autoComplete='off'
            onChange={this.handleValueChange}
            maxLength={TEXT_AREA_MAX_LENGTH}
            resizable={false}
          />
        </FormField>
        <Button className='contact-form__submit' type='submit'>
          Submit
        </Button>
      </form>
    );
  }
}
