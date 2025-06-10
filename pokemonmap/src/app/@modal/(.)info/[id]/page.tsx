import Modal from "@/components/modal";
import InfoPage from "@/app/info/[id]/page";

export default function InterceptedInfoPage(props: any) {
  return (
    <Modal>
      <InfoPage {...props} isModal={true} />
    </Modal>
  );
}
