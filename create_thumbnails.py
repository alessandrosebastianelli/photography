# importing Image class from PIL package 
from PIL import Image
import glob
import os


images = glob.glob(os.path.join('images', 'fulls', '*'))
shrink_factor = 0.1
#print(images)

for img in images:

    print('Processing img ', img)
    # creating a object 
    image = Image.open(img)
    size = (int(image.size[0]*shrink_factor), int(image.size[1]*shrink_factor))
  
    image.thumbnail(size)
  
    # creating thumbnail
    image.save(img.replace('fulls', 'thumbs'))
