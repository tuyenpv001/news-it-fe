import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Paper, Stack, Typography, alpha, Modal } from '@mui/material'
import { red, yellow } from '@mui/material/colors'
import { Dispatch, SetStateAction, useState } from 'react'
import { theme } from '../../utils'

export interface IModalDeleteProps {
    title: string
    message: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    onDelete: () => Promise<void>
}

export function ModalDelete({
    title,
    message,
    open,
    setOpen,
    onDelete,
}: IModalDeleteProps) {
    const [loading, setLoading] = useState<boolean>(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = async () => {
        try {
            setLoading(true)
            await onDelete()
            setOpen(false)
        } catch (error) {
            throw new Error(error as string)
        }
        setLoading(false)
    }

    return (
        <Modal
            open={!!open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                padding: 1,
            }}
        >
            <Box
                component={Paper}
                elevation={1}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                        md: 400,
                        xs: '95%',
                    },
                    padding: {
                        md: 3,
                        xs: 2,
                    },
                }}
            >
                <Stack direction={'row'} justifyContent={'center'} marginBottom={2}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            padding: 1,
                            borderRadius: '50%',
                            backgroundColor: red[50],
                            color: red[500],
                        }}
                    >
                        <DeleteIcon fontSize="large" />
                    </Box>
                </Stack>

                <Typography
                    variant="h6"
                    component="h2"
                    fontWeight={700}
                    marginBottom={1.5}
                    sx={{
                        padding: {
                            md: theme.spacing(0, 4),
                            xs: theme.spacing(0, 1),
                        },
                        textAlign: 'center',
                        lineHeight: 1.5,
                        color: theme.palette.secondary.dark,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    sx={{
                        padding: theme.spacing(0, 4),
                        textAlign: 'center',
                        fontSize: theme.typography.body2,
                        color: alpha(theme.palette.secondary.dark, 0.7),
                        marginBottom: 3,
                        a: {
                            color: yellow[700],
                        },
                        '&:hover': {
                            a: {
                                textDecoration: 'underline',
                            },
                        },
                    }}
                >
                    {message}
                </Typography>

                <Stack
                    direction="row"
                    gap={1}
                    justifyContent="center"
                    sx={{
                        button: {
                            padding: 1.5,
                            fontWeight: 500,
                        },
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            color: theme.palette.secondary.main,
                            border: `1px solid ${alpha(
                                theme.palette.secondary.main,
                                0.3
                            )}`,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            },
                        }}
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    {loading ? (
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            disabled={loading}
                            sx={{
                                flex: 1,
                                backgroundColor: red[500],
                                color: theme.palette.primary.contrastText,
                                border: '1px solid transparent',
                                '&:hover': {
                                    backgroundColor: red[700],
                                },
                            }}
                            onClick={handleDelete}
                        >
                            Delete
                        </LoadingButton>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{
                                flex: 1,
                                backgroundColor: red[500],
                                color: theme.palette.primary.contrastText,
                                border: '1px solid transparent',
                                '&:hover': {
                                    backgroundColor: red[700],
                                },
                            }}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    )}
                </Stack>
            </Box>
        </Modal>
    )
}
