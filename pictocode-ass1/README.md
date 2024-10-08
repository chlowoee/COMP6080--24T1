# Assessment 1 - PicToCode

## Change Log

* 18/02: Added "if applicable" comment to pseudo classes; updated text for task3 - there is some confusion between the terms "Pro" and "Business" in the enterprise screenshots. You can use those two words interchangably, it won't matter which you use.
* 19/02: Added missing statement in task 2 around 'Your are expected to have reasonable intermediate states. In other words, if the window size is some combination of widths between 501 and 1040, combined with some combination of heights between 577 and 592, the page should still reflect the same general structure.'. Mostly completing this task results in this anyway, so it should be a fairly minor adjustment.
* 20/2: Updated assets description for task 2 - Rephrase to clarify the assets provided and the suggested fonts.

## 1. Before you start

### 1.1. Background & Motivation

This assessment focuses on you implementing a series of basic web pages that look and behave like images and descriptions we we provide.

A basic capability required of someone working with user-facing interfaces is to be able to produce a web page that looks and behaves like something that has been clearly specified (e.g. an image). A common workflow within a product team may consist of a designer producing a high fidelity mock-up, which a developer will then take and use HTML/CSS to build the webpage for usage. In reality this process tends to be a bit more collaborative, and the high fidelity mockups provided are usually quite detailed and visually consist of many interact layers. However, for the sake of simplicity and fundamental knowledge we are providing flattened images with written requirements.

This assessment aims to allow students to demonstrate knowledge they've developed during week 1-3 of the course. You will be building web pages with HTML and CSS.

This assessment focuses on demonstrating skills with HTML ("Hyper Text Markup Language") and CSS ("Cascading Style Sheets") covered in week 1 of the course. Most of the tasks centre around this.

### 1.2. Lectures to watch

You will _need_ to watch at least the following lectures before starting (it will help you get started):
 * [HTML Fundamentals](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/html-fundamentals)
 * [CSS Rules](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/css-rules)
 * [CSS Formatting](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/css-formatting)
 * [Flexbox](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/css-flexbox)
 * [Mobile CSS](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/css-mobile)
 
You will _need_ to watch at least the following lectures to finish the assessment completely:
 * [Fonts](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/css-fonts)
 * [Dev Tools](https://cgi.cse.unsw.edu.au/~cs6080/NOW/content/lectures/dev-tools)

## 2. Tasks

### 2.1. Task 1 - Static, fixed size page

Build a page that looks identical to [task1/page.png](task1/page.png). The window width you should work with is 1555 x 808 pixels. You are only allowed to use HTML and CSS for this task. No external libraries are permitted.

Please build your page in [task1/index.html](task1/index.html). You are welcome to create as many CSS files that you need in the `task1` folder for `index.html` to import. When being marked, your tutor will start with `index.html`.

#### Assets

* The assets are provided in `task1/assets/text.txt` give you the text to 
put on the page.
* For the arrows, you are able to use a reasonable emoji (or image of your choice found online) to display that element.
* Your font doesn't have to match exactly. You can use font-family `Arial` or `Helvetica` for the page.

### 2.2. Task 2 - Static, fixed size page

Build a responsive page that complies with [task2/page_big.png](task2/page_big.png) and [task2/page_small.png](task2/page_small.png). The big page is 1040 x 577 pixels, and the small page is 501 x 592 pixels. Your single page (note that you're not using two separate HTML files) should like identical to either of these pages depending on the window sized the browser is at.

You can assume that all the input fields are `<input />` tags. All non-text inputs do not need any drop down behaviour or dynamic styling when being clicked etc. For text inputs they can be assumed to be static text inputs that have a text of colour `#000000` when text is inputted. None of the text inputs need to deal with text longer than 10 characters.

Your are expected to have reasonable intermediate states. In other words, if the window size is some combination of widths between 501 and 1040, combined with some combination of heights between 577 and 592, the page should still reflect the same general structure.

Please build your page in `task2/index.html`. You are welcome to create as many CSS files that you need in the `task2` folder for `index.html` to import. When being marked, your tutor will start with `index.html`.

#### Assets
* The asset(s) are provided in `task2/assets`.
* For the right arrow, you are able to use a reasonable emoji (or image of your choice found online) to display that element.
* Your font doesn't have to match exactly. You can use font-family `Arial` or `Helvetica` for the page.

### 2.3. Task 3 - Responsive static page

Build a responsive page that complies with [task3/page_big.png](task3/page_big.png) and [task3/page_small.png](task3/page_small.png). The big page is 1595 x 895 
pixels, and the small page is 673 x 3034 pixels. Your single page (note that you're not using two separate HTML files) should like identical to either of these pages depending on the window sized the browser is at.

Your are expected to have reasonable intermediate states. In other words, if the window size is some combination of widths between 673 and 1595, combined with some combination of heights between 895 and 3034, the page should still reflect the same general structure.

Please build your page in `task3/index.html`. You are welcome to create as many CSS files that you need in the `task3` folder for `index.html` to import. When being marked, your tutor will start with `index.html`.

#### Assets
* The asset(s) are provided in `task3/assets`.
* Your font doesn't have to match exactly. You can use font-family `Arial` for the page.

## 3. Analysing the pages

### 3.1. Analysing the Pages

Two things will want to seek external help for are:
1) Determining the particular colour (RGB or HEX) of various pixels (we recommend the use of [a chrome extension](https://chrome.google.com/webstore/detail/eye-dropper/hmdcmlfkchdmnmnmheododdhjedfccka/), though other alternatives may be appropriate for you)
2) Determining the size of particular elements (we recommend the use of [photopea](https://www.photopea.com/)). An screenshot example of it's usage can be found [here](./help/photopea.png)

### 3.2. Font Sizes

You will also be curious to know what the correct font-size and other font properties are for this assignment. Part of this assignment is trying to explore the relationship between how a font looks and the properties that are set for the element. 

Generally the best approach is to set a basic font size (e.g. `font-size: 1.1em`), see how it looks, and if it just generally seems too big or too small, then adjust the `em` or `rem` value appropriately until you're comfortable with it. You will not be  penalised for having font that is off by a few pixels in size. We will cover best practices when it comes to font sizing later in the course. 

## 4. Constraints & Assumptions

### 4.1. Correct viewing settings

Don't forget to put this code in the head of each webpage you make: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`. It will help you on mobile responsive view get the right zoom.

### 4.2. Fair use of methods

You are prohibited from unreasonable use of images and svg to solve your problem - more specifically, you cannot upload large chunks of the 'page' as just a single SVG image or single JPG.

### 4.3. Browser Compatibility

You should ensure that your programs have been tested on Google Chrome, ensuring that you are running the latest version.

### 4.4. External libraries

You are restricted from using any third party CSS libraries when completing this assessment. Basically, this means you can't import code using the `<script />` and `<link />` tags if it's from a file you did not write yourself, and you shouldn't be copying any larger chunks of code from other sources.

## 5. Marking Criteria

Your assignment will be hand-marked by tutor(s) in the course according to the criteria below.

<table>
	<tr>
		<th>Criteria</th>
		<th>Weighting</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>Visual Compliance</td>
		<td>50%</td>
		<td>
			<ul>
				<li>Rendered static HTML page accurately matches the reference image provided for each task. <i>Please note: For text, don't expect every word to match every position on every line. Different screens, browsers, operating systems may display text slightly differently. It's normal for words to overflow in different positions.</i></li>
				<li>For specified tasks, if applicable, pseudo-class behaviour satisfies the task requirements</li>
				<li>For specified tasks, rendered HTML page renders appropriately for intermediate sizes</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td>Code Quality</td>
		<td>50%</td>
		<td>
			<ul>
				<li>Your code is compliant with the course style guide, which includes but is not limited to:
					<ul>
						<li>HTML is appropriately formatted such that each inner HTML is indented with respect to the outer one</li>
						<li>HTML follows the correct structure and usage of head, title, meta, body </li>
						<li>CSS is appropriate structured to be placed in external stylesheets rather than inline styles</li>
						<li>CSS ID and class selectors are clearly and meaningfully named</li>
						<li>CSS has limited repetition where multiple similar components use the same underlying styles</li>
						<li>Ensure that source code (HTML, CSS) is no more complicated or verbose than necessary to solve a given problem (less is more).</li>
						<li>Maintaining separation between HTML and CSS for structural and stylistic aspects, respectively</li>
						<li>Avoiding usage of more obselete methods of page styling that have been discussed in lectures (e.g. tables for non-tabular purposes)</li>
					</ul>
				</li>
			</ul>
		</td>
	</tr>
</table>

## 6. Originality of Work

The work you submit must be your own work.  Submission of work partially or completely derived from
any other person or jointly written with any other person is not permitted.

The penalties for such an offence may include negative marks, automatic failure of the course and
possibly other academic discipline. Assignment submissions will be examined both automatically and
manually for such submissions.

Relevant scholarship authorities will be informed if students holding scholarships are involved in
an incident of plagiarism or other misconduct.

Do not provide or show your assignment work to any other person &mdash; apart from the teaching
staff of COMP6080.

If you knowingly provide or show your assignment work to another person for any reason, and work
derived from it is submitted, you may be penalized, even if the work was submitted without your
knowledge or consent.  This may apply even if your work is submitted by a third party unknown to
you.

Every time you make commits or pushes on this repository, you are acknowledging that the work you
submit is your own work (as described above).

Note you will not be penalized if your work has the potential to be taken without your consent or
knowledge.

## 7. Submission

This assignment is due *Friday 1st March, 8pm*.

To submit your assignment, you must have pushed all of your code to your gitlab master branch. You can check if you've done this properly by seeing what code is on the gitlab site on your master branch.
 
We will collect the latest work on your master branch of gitlab at the time of submission.

It is your responsibiltiy to ensure that your code can run successfully when cloned fresh from Gitlab.

## 8. Late Submission Policy

No late submission are accepted.
