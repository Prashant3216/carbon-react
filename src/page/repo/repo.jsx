import { Grid, Column } from "@carbon/react";
import RepoTable from "./repoTable";
import { headers, rows } from "./repoStaticTable";

function Repo() {
  return (
    <Grid className="repo-page">
      <Column lg={16} md={8} sm={4} className="repo-page__r1">
        <RepoTable rows={rows} headers={headers} />
      </Column>
    </Grid>
  );
}

export default Repo;
