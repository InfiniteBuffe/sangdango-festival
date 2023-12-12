import PageTitle from '@/components/PageTitle'
import styles from '@/styles/pages/Vote/Vote.module.css'
import { TextField, createTheme, ThemeProvider, Button } from '@mui/material'
import { styled } from '@mui/system'
import { pink } from '@mui/material/colors'

const Vote = () => {
    const theme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        marginTop: '25px',
                        backgroundColor: 'gray',
                        fontFamily: 'pretendard',
                        fontWeight: '500',
                        '&:hover': {
                            backgroundColor: 'gray',
                        },
                    }
                }
            },
            MuiFormHelperText: {
                styleOverrides: {
                    root: {
                        color: 'white',
                        fontFamily: 'pretendard',
                        fontWeight: '500'
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        "&.Mui-focused": {
                            color: "white"
                        },
                        "&.MuiInputLabel-outlined": {
                            color: "white"
                        },
                        fontFamily: 'pretendard',
                        fontWeight: '500'
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                    },
                    input: {
                        fontFamily: 'pretendard',
                        fontWeight: '500',
                        color: 'white'
                    }
                }
            }
        }
    });
    return (
        <>
            <PageTitle title="투표" />
            <p className={styles.info}>
                투표는 상당고등학교 용천제에 참여 중인 여러분만 이용하실 수 있습니다.
            </p>
            <div className={styles.box}>
                <div className={styles.title}>
                    투표자 정보 입력 📋
                </div>
                <div className={styles.description}>
                    정확한 투표 집계를 위해 필요합니다. 입력된 정보는 목적 달성 후 즉시 폐기됩니다.
                </div>
                <ThemeProvider theme={theme}>
                    <TextField
                        helperText="각 반에 지급된 코드를 정확하게 입력해주세요."
                        style={{ width: '100%', marginTop: '25px' }}
                        fullWidth
                        label="인증코드"
                        variant="outlined"
                        color="primary"
                    // onChange={(a) => }
                    // value={}
                    />
                    <TextField
                        helperText="예) 3학년 3반 15번 → 30315"
                        style={{ width: '100%', marginTop: '25px' }}
                        fullWidth
                        label="학번"
                        variant="outlined"
                        color="primary"
                    // onChange={(a) => }
                    // value={}
                    />
                    <Button variant="contained" size="large" fullWidth>
                        입력하기
                    </Button>
                </ThemeProvider>
            </div>
        </>
    )
}

export default Vote