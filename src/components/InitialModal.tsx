import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function InitialModal() {
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <>
      <Modal opened={opened} onClose={close} dir="rtl" title="خوش آمدید" withCloseButton={false}>
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  );
}

export default InitialModal;
