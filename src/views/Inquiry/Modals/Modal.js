import React from "react"
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'


const ScheduleModal = (props) => {
  console.log("pp", props)
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
}

  return (
      <BootstrapDialog
        onClose={() => props.setShowModal(prevState => !prevState)}
        aria-labelledby="customized-dialog-title"
        open={props.setShowModal}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => props.setShowModal(prevState => !prevState)}>
          {props.formTitle}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {props.data}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => props.setShowModal(prevState => !prevState)}>
            Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
  )
}

export default ScheduleModal
