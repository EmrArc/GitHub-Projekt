import Lottie from "react-lottie";
import animationData from "../static/Lottie/4331-coins-money-reward-prize";

export const LottieTrigger = () => {
  //LottieFile animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};
