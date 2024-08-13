import { ContactForm, Notification, Section } from '@/components/containers';
import Observable from '@/services/observable';

export default class ContactPage extends Observable<string> {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <Section title='Contact Us'>
        <ContactForm notify={this.notify} />
        <Notification attach={this.attach} detach={this.detach} />
      </Section>
    );
  }
}
