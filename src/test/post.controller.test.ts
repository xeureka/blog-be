import { readPost,showPosts } from "controller/post.controller";
import { Request,Response } from "express";
import Posts from '../models/post.model'


jest.mock('../models/post.model')

describe('readPost controller', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    let jsonMock: jest.Mock
    let statusMock: jest.Mock

    beforeEach(() =>{
        jsonMock = jest.fn()
        statusMock = jest.fn().mockReturnValue({json: jsonMock})

        req = {params: {id:'123'}};
        res = {json: jsonMock, status: statusMock}
    })

    it ('should return a post when found ', async () => {
        (Posts.findById as jest.Mock).mockResolvedValue({_id: '123', title: 'Test Post'});

        await readPost(req as Request , res as Response)
        
        expect(Posts.findById).toHaveBeenCalledWith('123');
        expect(jsonMock).toHaveBeenCalledWith({_id: '123',title: 'Test Post'})
    })

    it ('should return 400 if the post is not found', async () => {
        (Posts.findById as jest.Mock).mockResolvedValue(null);

        await readPost(req as Request, res as Response)

        expect(jsonMock).toHaveBeenCalledWith({message: 'Error getting a post ! '})
        expect(statusMock).toHaveBeenCalledWith(400)
    })

    it('should handle errors gracefully', async () => {
        const error = new Error('DB Error');
        (Posts.findById as jest.Mock).mockRejectedValue(error);

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        await readPost(req as Request, res as Response)

        expect(jsonMock).toHaveBeenCalledWith('Error reading a post !')
        expect(consoleSpy).toHaveBeenCalledWith(error)
    })

    it ('shoudl return a post when found', async () => {
        const mockPosts = [{ _id: '1', title: 'Post 1' }, { _id: '2', title: 'Post 2' }];

        (Posts.find as jest.Mock).mockResolvedValue(mockPosts)

        await showPosts(req as Request, res as Response);

        expect(Posts.find).toHaveBeenCalledWith()
        expect(jsonMock).toHaveBeenCalledWith(mockPosts)
    })

    it ('should gracefully catches and logs the errors ', async() => {
         const error = new Error('DB Error');
        (Posts.find as jest.Mock).mockResolvedValue(error)

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

        await showPosts(req as Request, res as Response)

        // expect(jsonMock).toHaveBeenCalledWith({message: "Error Fetching data"})
        expect(consoleSpy).toHaveBeenCalledWith(error)
    })

})


/** Lets write our own test for showPosts
 * 
 * 1. return post when it exists
 * 2. catches and logs error
 * 
 */


/** Goal of the test for readPost
 * 
 * we want to test this controller under 3 conditions
 * 
 * 1. Returns post when it exists
 * 2. Returns error message when post not found
 * 3. Catches and logs erro if something thows
 * 
 */
