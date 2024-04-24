import React,{useState} from "react";
import DownloadIcon from "../../assets/account/downloadIcon.svg";
import DeleteIcon from "../../assets/cart/deleteIcon.svg";
const Prescription = ({ prescription, onDelete  }) => {
  // Convert timestamp to date and time
  const updatedAtDate = new Date(parseInt(prescription.updatedAt, 10));
  const formattedDate = updatedAtDate.toLocaleString();
  const [pdfUrl, setPdfUrl] = useState(prescription?.url);

  console.log(pdfUrl,'++++++++=====+++++===++++==++++====+++==++++==++++')
  const handleDownloadClick = () => {
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'prescription.pdf'; // Set the desired file name
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error);
      });
  };



  return (
    <div className="items-center flex py-4 border-b border-[#E2E8F0] justify-between">
      {/* file */}
      <div className=" items-center flex justify-between w-[32.188rem] rounded gap-1 p-3 bg-[#F8FAFC]">
        <div className="text-[#1E293B] text-[0.875rem]">
          {prescription.url}
        </div>

        <button className="text-[0.75rem] font-HelveticaNeueMedium uppercase text-[#7487FF]">
        <a href={prescription.url} target="_blank" rel="noopener noreferrer">
        View
      </a>
        </button>
      </div>

      {/* upload date */}
      <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#94A3B8]">
        Uploaded on {formattedDate}
      </h1>

      {/* options */}
      <div className="flex gap-4">
        <button onClick={handleDownloadClick} >
          <img src={DownloadIcon} alt="download icon" className="w-6 h-6" />
        </button>

        <button onClick={onDelete}>
          <img src={DeleteIcon} alt="delete icon" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Prescription;
