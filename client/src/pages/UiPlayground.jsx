import Faqs from "../components/faqs/Faqs";
import StepsLine from "../components/steps/StepsLine";
import SuccessModal from "../components/modals/SuccessModal";
import DangerModal from "../components/modals/DangerModal";
import ShareLinkModal from "../components/modals/ShareLinkModal";
import TermsModal from "../components/modals/TermsModal";

export default function UiPlayground() {
  return (
    <div className="pb-24">
      <StepsLine />
      <Faqs />

      <div className="flex gap-4 justify-center mt-16">
        <SuccessModal />
        <DangerModal />
        <ShareLinkModal />
        <TermsModal />
      </div>
    </div>
  );
}