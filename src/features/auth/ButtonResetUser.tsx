import { useDispatch } from "react-redux"
import { AppDispatch } from "../../app/store"
import { resetUsers } from "./authSlice";
import { Button } from "../../components/ui/button";

const ButtonResetUser = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleUserRemove = () => {
        dispatch(resetUsers());
    }

  return (
    <Button onClick={() => handleUserRemove()}>
        Выйти
    </Button>
  )
}

export default ButtonResetUser