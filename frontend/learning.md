# Problem :
### Child "BlogCard" component was getting re rendered before passing of props from parent "loggedinContent" component. Hence data was getting updated in database and also useState variable was getting updated but that edited chiold card was showing previous data instead of showing latest edited array data.

# Solution
### I used useeffect hook in BlogCard child component but did not pass any dependency array to it. Then i added another line in useEffect `setCurrentBlog(blog)` to make sure the card values are according to the `blog` variable that was passed from parent component. This time I added `blog` as a dependency of useEffect & Bingo!!!!! 
