# GitHub PR Reviewer

This project automatically reviews GitHub pull requests using OpenAI's GPT-3.5-turbo model and posts the review as a comment on the pull request.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- GitHub Personal Access Token
- OpenAI API Key

## Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/github-pr-reviewer.git
    cd github-pr-reviewer
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Create a `.env` file in the root directory and add the following environment variables:**
    ```properties

    # GitHub Personal Access Token
    GITHUB_TOKEN=your_github_personal_access_token

    # OpenAI API Key
    OPENAI_API_KEY=your_openai_api_key

    ```

## Running the Project

To run the project and review a specific pull request, use the following command:

```sh
npm start <pr_number> <repo_owner> <repo_name>
```

Replace `<pr_number>` with the number of the pull request you want to review. For example, to review pull request number 123,
Replace `<repo_owner>` with the Git Account name,
Replace `<repo_name>` with the Repository Name,run:

```sh
npm start 123 Account_name Repo_name 
```

This will fetch the specified pull request, generate a review using OpenAI, and post the review comment to the GitHub repository.