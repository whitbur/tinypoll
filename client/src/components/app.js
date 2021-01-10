import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, ThemeProvider, Typography } from '@material-ui/core'
import { Provider } from 'react-redux'
import Poll from './poll'
import Results from './results'
import EditPoll from './edit_poll'
import CenterPaper from './center_paper'
import store from '../store'

const defaultTheme = createMuiTheme({
    palette: {
        type: "dark"
    }
})

export default function() {
    const [theme, setTheme] = useState(defaultTheme)
    const setPalette = useCallback(palette => setTheme(createMuiTheme({palette: palette})), [setTheme])

    return <ThemeProvider theme={theme}>
        <Provider store={store}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path="/vote/:voteId"> <Poll setPalette={setPalette}/> </Route>
                    <Route path="/results/:pollId"><Results setPalette={setPalette}/></Route>
                    <Route path="/edit/:pollId"> <EditPoll setPalette={setPalette}/> </Route>
                    <Route path="/thanks">
                        <CenterPaper>
                            <Typography variant="h4">Thanks!</Typography>
                            <Typography variant="body1" style={{marginTop:"20px"}}>
                                Your response has been recorded. Feel free to take a break <span role="img" aria-label="coffee">☕</span>
                            </Typography>
                        </CenterPaper>
                    </Route>
                    <Route path="/">
                        <CenterPaper>
                            <Typography variant="h4">Oh, uhhh... Hi.</Typography>
                            <Typography variant="body1" style={{marginTop:"20px"}}>
                                You were supposed to come here with a specific link. Otherwise I don't really know to which poll to send you. 
                                Try talking to whomever sent you this link, or starting over somehow.
                            </Typography>
                            <Typography variant="body1" style={{marginTop:"20px"}}>Good luck!</Typography>
                        </CenterPaper>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    </ThemeProvider>
}