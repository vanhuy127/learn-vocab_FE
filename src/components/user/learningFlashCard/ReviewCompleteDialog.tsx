import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/constants";

const ReviewCompleteDialog = () => {
    const { isOpen, data, closeModal } = useModalStore();
    const navigate = useNavigate();
    const mastered = data?.mastered || 0;
    const notLearning = data?.notLearning || 0;

    const accuracy = Math.round(
        (mastered / (mastered + notLearning)) * 100
    );

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                        🎉 Chúc mừng!
                    </DialogTitle>
                    <p className="text-center text-muted-foreground">
                        Bạn đã hoàn thành phiên ôn tập
                    </p>
                </DialogHeader>
                {
                    mastered === 0 && notLearning === 0 || (
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Đã thuộc</span>
                                <span>{mastered}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Chưa thuộc</span>
                                <span>{notLearning}</span>
                            </div>

                            <hr />

                            <div className="flex justify-between">
                                <span>🎯 Độ chính xác</span>
                                <span>{accuracy}%</span>
                            </div>
                        </div>
                    )
                }

                <DialogFooter className="flex gap-2">
                    <Button variant="secondary" onClick={() => {
                        data!.reviewAgain(0);
                        closeModal();
                    }}>
                        Ôn tập lại
                    </Button>
                    <Button onClick={() => { navigate(ROUTE_PATH.USER.STUDY_SET.DETAILS.LINK(data!.id)) }}>Quay về danh sách</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewCompleteDialog