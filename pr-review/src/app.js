const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { reviewPullRequest } = require("./services/openAIService");
const { fetchPullRequests, postReviewComment } = require("./services/githubService");

const prNumber = process.argv[2];
const repoOwner = process.argv[3];
const repoName = process.argv[4];
const githubToken = process.env.GITHUB_TOKEN;
const githubOwner = process.env.GITHUB_OWNER;

console.log(`PR Number: ${prNumber}`);
console.log(`Repo Owner: ${repoOwner}`);
console.log(`Repo Name: ${repoName}`);
console.log(`GitHub Token: ${githubToken ? 'Present' : 'Not Present'}`);
console.log(`GitHub Owner: ${githubOwner}`);

if (!githubToken) {
  console.error('GitHub token is missing');
  process.exit(1);
}

const runReviewProcess = async () => {
    if (!prNumber || !repoName || !repoOwner) {
        console.error("Please provide a PR number and repository name as arguments.");
        return;
    }

    try {
        const prs = await fetchPullRequests(repoOwner, repoName);
        const pr = prs.find(pr => pr.number == prNumber);
        if (!pr) {
            console.error(`Pull request #${prNumber} not found in repository ${repoName}.`);
        }

        const review = await reviewPullRequest(pr);

        // Post the review comment to GitHub
        const comment = await postReviewComment(pr.number, repoOwner, repoName, review);
        console.log(`Review posted for PR #${prNumber} in repository ${repoOwner}/${repoName}. Comment number: ${comment.id}`);

        // Write the review comment to a file to trigger GitHub action
        const filePath = path.join(__dirname, 'review_comment.txt');
        console.log(`Review comment written to ${filePath}`);

    } catch (error) {
        console.error("Error during API call:", error.message);
    } finally {
        console.log("Terminating process...");
        return;
    }
};

runReviewProcess();