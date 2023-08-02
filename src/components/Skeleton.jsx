import React from "react";
import { styled } from "styled-components";

function Skeleton() {
  return (
    <div className="px-4 w-full aspect-[1.35]">
      <SkeletonDiv />
    </div>
  );
}
const SkeletonDiv = styled.img`
  background-color: #eaeaea;
  width: 100%;
  aspect-ratio: 1.35;
  // The shine that's going to move across the skeleton:
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0)
  );
  background-size: 40px 100%; // width of the shine
  background-repeat: no-repeat; // No need to repeat the shine effect
  background-position: left -40px top 0; // Place shine on the left side, with offset on the left based on the width of the shine - see background-size
  animation: shine 1s ease infinite; // increase animation time to see effect in 'slow-mo'

  @keyframes shine {
    to {
      // Move shine from left to right, with offset on the right based on the width of the shine - see background-size
      background-position: right -40px top 0;
    }
  }
`;
export default Skeleton;
