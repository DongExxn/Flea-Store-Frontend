import React from "react";

import MarketCard from "./MarketCard.js";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Grid,
    Button,
    Box,
    Stack,
    CardContent,
    CardMedia,
    Card,
    CardButton,
    CardActionArea,
    CardActions,
    Typography,
    Container,
} from "@mui/material";

const theme = createTheme();

function MarketList({ list }) {
    const marketList = list;

    return (
        <ThemeProvider theme={theme}>
            <Container
                sx={{ py: 8 }}
                maxWidth="lg"
                style={{ paddingTop: "10px" }}
            >
                <Grid container spacing={3}>
                    {marketList.map((market) => (
                        <Grid key={market.id} item xs={12} sm={6} md={4}>
                            <MarketCard
                                id={market.id}
                                img={market.img}
                                url={market.url}
                                name={market.name}
                                location={market.location}
                                detail={market.detail}
                                time={market.time}
                                period={market.period}
                                like={market.like}
                                view={market.view}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default MarketList;
