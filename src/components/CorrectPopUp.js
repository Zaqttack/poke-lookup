import {
    Modal,
    Box,
    Typography,
    Button,
} from '@mui/material'
import voca from 'voca'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export function CorrectPopUp(props) {
    const name = voca.titleCase(props.pokemonName)

    return (
        <Modal
            open={props.isOpen}
            onClose={props.closeFunction}
            aria-labelledby="modal-modal-title"
            aria-describedby={`Your pokemon was ${name}`}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Correct! It was {name}!
                </Typography>
                <img
                    style={{ maxWidth: 336 }}
                    src={props.imageSource.other.dream_world.front_default}
                    alt={`image of ${name}`}
                    loading="lazy"
                />
                {/* <Button onClick={props.handleCloseWin}>Close modal</Button> */}
            </Box>
        </Modal>
    )
}