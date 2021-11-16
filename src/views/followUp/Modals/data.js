import pdf from '@src/assets/images/icons/file-icons/pdf.png'
import { Trash, Clock } from 'react-feather'
import { Media, Button } from 'reactstrap'

export const iconsData = [
  {
    title: '12 Invoices have been paid',
    content: 'Invoices have been paid to the company.',
    icon: <Clock size={14} />,
    meta: (<Button
      className="btn-icon rounded-circle"
      color="flat-danger"
      onClick={() => { console.log("DELETE") }}
      >
          <Trash size={15} />
      </Button>),
    customContent: (
      <Media>
        <img className='mr-1' src={pdf} alt='pdf' height='23' />
        <Media body>invoice.pdf</Media>
      </Media>
    )
  },
  {
    title: '12 Invoices have been paid',
    content: 'Invoices have been paid to the company.',
    icon: <Clock size={14} />,
    meta: (<Button
      className="btn-icon rounded-circle"
      color="flat-danger"
      onClick={() => { console.log("DELETE") }}
      >
          <Trash size={15} />
      </Button>),
    customContent: (
      <Media>
        <img className='mr-1' src={pdf} alt='pdf' height='23' />
        <Media body>invoice.pdf</Media>
      </Media>
    )
  }
]
