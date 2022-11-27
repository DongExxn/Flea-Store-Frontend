import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
    CardContent,
    CardMedia,
    Card,
    CardButton,
    CardActionArea,
    CardActions,
    Button,
    Typography,
} from "@mui/material";

const MarketCard = ({
    id,
    img,
    url,
    name,
    location,
    detail,
    time,
    period,
    like,
    view,
}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";

    let temp = img;
    if (temp[0] === ".")
        temp = process.env.PUBLIC_URL + `assets/market_img.png`;

    return (
        <Card
            className="Card"
        >
            <CardActionArea
                style={{ cursor: "pointer" }}
                component={Link}
                to={`/market/${id}`}
            >
                <CardMedia
                    component="img"
                    sx={{
                        height: "50%",
                    }}
                    image={temp}
                    alt="market image"
                    style={{ height: "260px" }}
                />

                <CardContent className="info_box" sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom component="h2" variant="h5">
                        {name.length > 14 ? name.slice(0, 13) + "..." : name}
                    </Typography>
                    <Typography
                        className="location"
                        component="p"
                        variant="body1"
                    >
                        위치 : {location}
                    </Typography>
                    <Typography
                        className="location"
                        component="p"
                        variant="body1"
                    >
                        상세 : {detail}
                    </Typography>
                    <Typography className="time" component="p" variant="body1">
                        운영시간 : {time}
                    </Typography>
                    <Typography
                        className="period"
                        component="p"
                        variant="body1"
                    >
                        기간 : {period}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="interest_figure">
                <Button size="small">관심👍</Button>
                {like}
                <Button size="small">뷰 </Button> {view}
            </CardActions>
        </Card>
    );
};

MarketCard.propTypes = {
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    view: PropTypes.number.isRequired,
};

export default MarketCard;
