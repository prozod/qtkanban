import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700&display=swap");

body, html {
	margin: 0;
	padding: 0;
	box-sizing: border-box;

	font-family: "Fira Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
		"Oxygen", "Ubuntu", "Cantarell", "Droid Sans","Helvetica Neue", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color: #f5f6f8;
	width: 100%;
	margin: 0 auto;
}

  .App {
	position: absolute;
	display: flex;
	flex: 1;
	height: 100vh;
	width: 100%;


	@media (max-width: 902px) {
		height: 100%;
	}
}

`;

export default GlobalStyle;
