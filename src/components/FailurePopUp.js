import {
    Modal,
    Box,
    Typography,
    Grid,
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

export function FailurePopUp(props) {
    const name = voca.titleCase(props.pokemonName)

    return (
        <Modal
            open={props.isOpen}
            onClose={props.closeFunction}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container display="flex" justifyContent="center" alignItems="center">
                    <Grid item xs={6}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Wrong!
                        </Typography>
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent="right" alignItems="right">
                        <Typography variant='h6'>
                            Streak of {props.streak}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                            Your pokemon was {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                        <img
                            style={{ maxWidth: 336, MaxHeight: 336 }}
                            src={props.imageSource.other.dream_world.front_default}
                            alt={`${name}`}
                            loading="lazy"
                        />
                    </Grid>
                    <Grid item sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={props.closeFunction}>Continue</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}