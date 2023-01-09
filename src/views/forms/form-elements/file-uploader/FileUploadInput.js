// ** React Imports
import { useState, Fragment } from "react"

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap"

// ** Third Party Imports
import { useDropzone } from "react-dropzone"
import { FileText, X, DownloadCloud } from "react-feather"

const FileUploadInput = ({ uploadPhoto }) => {
  // ** State
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles([...acceptedFiles.map((file) => Object.assign(file))])
      uploadPhoto([...acceptedFiles.map((file) => Object.assign(file))][0])
    }
  })

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="28"
          width="28"
        />
      )
    } else {
      return <FileText size="28" />
    }
  }

  const handleRemoveFile = (file) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i) => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile(file)}
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  return (
    <>
      {files.length ? (
        <Fragment>
          <ListGroup>{fileList}</ListGroup>
        </Fragment>
      ) : (
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className="d-flex align-items-center justify-content-center flex-column">
            <p className="text-secondary">
              <a href="/" onClick={(e) => e.preventDefault()}>
                <DownloadCloud size={24} />
                <span className="mx-2">Browse</span>
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default FileUploadInput
