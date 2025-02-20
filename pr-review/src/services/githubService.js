const axios = require("axios");
require("dotenv").config();

// Function to fetch pull requests from a GitHub repository
async function fetchPullRequests(repoOwner, repoName) {
    const GITHUB_API_URL = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`;
    console.log(`Fetching pull requests from ${GITHUB_API_URL}`);
    try {
        const response = await axios.get(GITHUB_API_URL, {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching PRs:", error.response?.data || error.message);
        throw new Error("Failed to fetch PRs");
    }
}

// Function to post a review comment on a GitHub pull request
async function postReviewComment(prNumber, repoOwner, repoName, reviewComment) {
    const GITHUB_API_URL = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`;
    const url = `${GITHUB_API_URL}/${prNumber}/reviews`;
    console.log(`Posting review comment to ${url}`);
    try {
        const response = await axios.post(
            url,
            {
                body: reviewComment,
                event: "COMMENT",
            },
            {
                headers: {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error posting review comment:", error.response?.data || error.message);
        throw new Error("Failed to post review comment");
    }
}

// Function to fetch the diff of a GitHub pull request
const fetchPullRequestDiff = async (owner, repo, prNumber) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/vnd.github.v3.diff+json',
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching PR diff:", error.response?.data || error.message);
        throw new Error("Failed to fetch PR diff");
    }
};

module.exports = { fetchPullRequests, postReviewComment, fetchPullRequestDiff };
