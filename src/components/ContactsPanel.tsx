interface ContactsPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Панель контактов упразднена — контакты переехали на страницу /contacts
const ContactsPanel = (_props: ContactsPanelProps) => null;

export default ContactsPanel;
