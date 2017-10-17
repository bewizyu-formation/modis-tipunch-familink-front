import { ContactListPipe } from './contact-list.pipe';

describe('ContactListPipe', () => {
  it('create an instance', () => {
    const pipe = new ContactListPipe();
    expect(pipe).toBeTruthy();
  });
});
