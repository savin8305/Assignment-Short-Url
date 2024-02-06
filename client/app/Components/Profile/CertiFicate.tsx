import React, { FC, useState } from "react";


interface Props {
  userName: any;
  courseName:string;
}
// CertiFicate.tsx

const CertiFicate: React.FC<Props> = ({userName,courseName}) => {

  return (
    <div>
      <h1>Certificate Generator</h1>

    </div>
  );
};

export default CertiFicate;
