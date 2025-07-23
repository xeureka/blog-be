/** Goal
 * 
 * we want to test this controller under 3 conditions
 * 
 * 1. Returns post when it exists
 * 2. Retuns error message when post not found
 * 3. Catches and longs error if something throws
 * 
 */

import { readPost } from "controller/post.controller";
import {Request, Response } from 'express'
import Posts from "models/post.model";

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

    it('should return a post when found', async () => {
        (Posts.findById as jest.Mock).mockResolvedValue({ _id: '123', title: 'Test Post' });

        await readPost(req as Request, res as Response);

        expect(Posts.findById).toHaveBeenCalledWith('123');
        expect(jsonMock).toHaveBeenCalledWith({ _id: '123', title: 'Test Post' });
    });

        it('should return 400 if post is not found', async () => {
        (Posts.findById as jest.Mock).mockResolvedValue(null);

        await readPost(req as Request, res as Response);

        expect(jsonMock).toHaveBeenCalledWith({ message: 'Error getting a post ! ' });
        expect(statusMock).toHaveBeenCalledWith(400);
    });

    it('should handle errors gracefully', async () => {
        const error = new Error('DB Error');
        (Posts.findById as jest.Mock).mockRejectedValue(error);

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        await readPost(req as Request, res as Response);

        expect(jsonMock).toHaveBeenCalledWith('Error reading a post !');
        expect(consoleSpy).toHaveBeenCalledWith(error);

        consoleSpy.mockRestore();
    });

})