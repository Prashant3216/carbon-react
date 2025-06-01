import {
  Grid,
  Column,
  Link,
  DataTableSkeleton,
  Pagination,
} from "@carbon/react";
import RepoTable from "./repoTable";
import { headers } from "./repoStaticTable";
import { Octokit } from "@octokit/core";
import { useEffect, useState } from "react";

const octokitClient = new Octokit({});

const LinkList = ({ url, homepageUrl }) => (
  <ul style={{ display: "flex" }}>
    <li>
      <Link href={url}>GitHub</Link>
    </li>
    {homepageUrl && (
      <li>
        <span>&nbsp;|&nbsp;</span>
        <Link href={homepageUrl}>Homepage</Link>
      </li>
    )}
  </ul>
);

const getRowItems = (rows) =>
  rows.map((row) => ({
    ...row,
    key: row.id,
    stars: row.stargazers_count,
    issueCount: row.open_issues_count,
    createdAt: new Date(row.created_at).toLocaleDateString(),
    updatedAt: new Date(row.updated_at).toLocaleDateString(),
    links: <LinkList url={row.html_url} homepageUrl={row.homepage} />,
  }));

function Repo() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rows, setRows] = useState([]);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  useEffect(() => {
    async function getCarbonRepos() {
      const res = await octokitClient.request("GET /orgs/{org}/repos", {
        org: "carbon-design-system",
        per_page: 75,
        sort: "updated",
        direction: "desc",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      if (res.status === 200) {
        setRows(getRowItems(res.data));
      } else {
        console.log("Error obtaining repository data");
        setError("Error obtaining repository data");
      }
      setLoading(false);
    }

    getCarbonRepos();
  }, []);

  if (loading) {
    return (
      <Grid className="repo-page">
        <Column lg={16} md={8} sm={4} className="repo-page__r1">
          <DataTableSkeleton
            columnCount={headers.length + 1}
            headers={headers}
            rowCount={10}
          />
        </Column>
      </Grid>
    );
  }

  if (error) {
    return `Error! ${error}`;
  }

  return (
    <Grid className="repo-page">
      <Column lg={16} md={8} sm={4} className="repo-page__r1">
        <RepoTable
          rows={rows.slice(firstRowIndex, firstRowIndex + currentPageSize)}
          headers={headers}
        />
        <Pagination
          totalItems={rows.length}
          backwardText="Previous page"
          forwardText="Next page"
          pageSize={currentPageSize}
          pageSizes={[5, 10, 15, 25]}
          itemsPerPageText="Items per page"
          onChange={({ page, pageSize }) => {
            if (pageSize !== currentPageSize) {
              setCurrentPageSize(pageSize);
            }
            setFirstRowIndex(pageSize * (page - 1));
          }}
        />
      </Column>
    </Grid>
  );
}

export default Repo;
