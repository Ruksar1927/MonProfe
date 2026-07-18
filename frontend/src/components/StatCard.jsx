import { Card, CardContent, Typography } from "@mui/material";

function StatCard({ title, value }) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography
          variant="body1"
          color="text.secondary"
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;