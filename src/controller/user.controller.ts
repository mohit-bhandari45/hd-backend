import { Request, Response } from "express";
import { IUser, User } from "../model/user.model";
import { Content } from "../model/content.model";   


export const getUserDetails = async(req: Request,res:Response)=>{
  const user=req.user as IUser;
  console.log(user);
  try{
    const found= await User.findById(user.id);
    res.status(200).json(found);
  }catch(e){
    console.log(e);
  }
  
}

// Add content
export const addContentHandler = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  const user = req.user as IUser;
console.log(user)
  try {
    await Content.create({
      title,
      body,
      author: user.id 
    });

    res.status(200).json({ message: "Content added successfully" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: (e as Error).message });
  }
};

// Get all content for a user
export const getAllContentHandler = async (req: Request, res: Response) => {
  const user = req.user as IUser;

  try {
    const contents = await Content.find({ author: user.id }).sort({ createdAt: -1 });
    res.status(200).json( contents );
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: (e as Error).message });
  }
};

// Get single content by ID
export const getContentHandler = async (req: Request, res: Response) => {
  const contentId = req.params.contentId;

  try {
    const content = await Content.findById(contentId);

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    res.status(200).json({ data: content });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: (e as Error).message });
  }
};

// Delete content by ID
export const deleteContentHandler = async (req: Request, res: Response) => {
  const contentId = req.params.contentId;

  try {
    const deleted = await Content.findByIdAndDelete(contentId);

    if (!deleted) {
      return res.status(404).json({ error: "Content not found" });
    }

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: (e as Error).message });
  }
};

// Update content by ID
export const updateContentHandler = async (req: Request, res: Response) => {
  const contentId = req.params.contentId;
  const { title, body } = req.body;

  try {
    const updated = await Content.findByIdAndUpdate(
      contentId,
      { title, body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Content not found" });
    }

    res.status(200).json({ message: "Updated successfully", data: updated });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: (e as Error).message });
  }
};
