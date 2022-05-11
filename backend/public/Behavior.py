#!/usr/bin/env python
# coding: utf-8

# In[338]:

import pandas as pd
import numpy as np
from scipy.stats import t
import matplotlib.pyplot as plt
import seaborn as sns
import scipy.stats as st
import sys


# In[390]:


df1 = pd.DataFrame(np.random.uniform(60 , 10, 3000), columns=['totalClicksofmap']).astype(int)
df2 = pd.DataFrame(np.random.uniform(1400 , 2, 3000), columns=['time_s']).astype(int)
df3 = pd.DataFrame(np.random.uniform(3 , 1, 3000), columns=['refmodules_length']).astype(int)
df4 = pd.DataFrame(np.random.uniform(20 , 1, 3000), columns=['Note']).astype(int)
df=pd.concat([df1, df2,df3,df4], axis=1)



# ### No data Cleaning is needed

# In[335]:




# ## Confidence interval of totalClicks

# In[336]:


m = df['totalClicksofmap'].mean() 
s = df['totalClicksofmap'].std() 
dof = len(df['totalClicksofmap'])-1 
confidence = 0.90
t_crit = np.abs(t.ppf((1-confidence)/2,dof))
(min_total_click,max_total_click)=(m-s*t_crit/np.sqrt(len( df['totalClicksofmap'])), m+s*t_crit/np.sqrt(len( df['totalClicksofmap']))) 
min_total_click,max_total_click


# ##  Confidence interval of time

# In[337]:


m = df['time_s'].mean() 
s = df['time_s'].std() 
dof = len(df['time_s'])-1 
confidence = 0.90
t_crit = np.abs(t.ppf((1-confidence)/2,dof))
(min_time,max_time)=(m-s*t_crit/np.sqrt(len( df['time_s'])), m+s*t_crit/np.sqrt(len( df['time_s']))) 
(min_time,max_time)


# ##  Confidence interval of Number of modules

# In[391]:


m = df['refmodules_length'].mean() 
s = df['refmodules_length'].std() 
dof = len(df['refmodules_length'])-1 
confidence = 0.90
t_crit = np.abs(t.ppf((1-confidence)/2,dof))
(min_mod_num,max_mod_num)=(m-s*t_crit/np.sqrt(len( df['refmodules_length'])), m+s*t_crit/np.sqrt(len( df['refmodules_length']))) 
(min_mod_num,max_mod_num)


# ##  Confidence interval of Note

# In[137]:


m = df['Note'].mean() 
s = df['Note'].std() 
dof = len(df['Note'])-1 
confidence = 0.90
t_crit = np.abs(t.ppf((1-confidence)/2,dof))
(min_note,max_note)=(m-s*t_crit/np.sqrt(len( df['Note'])), m+s*t_crit/np.sqrt(len( df['Note']))) 
(min_note,max_note)


# In[65]:


sns.set_palette("RdBu")
sns.kdeplot(df['Note'], shade = True);


# ## Find Rates

# In[85]:


#time Rate
def time_rate(time,min_time,max_time):
    if(time>max_time):
        return -(((time*100)/max_time)-100)
    elif (time<min_time):
        return 100-((100*time)/min_time)
    else:
        return 0


# In[379]:


time_rate(1400,min_time,max_time)


# In[36]:


def click_rate(click,min_total_click,max_total_click):
    if(click>max_total_click):
        return -(((click*100)/max_total_click)-100)
    elif (click<min_total_click):
        return 100-((100*click)/min_total_click)
    else:
        return 0


# In[369]:


click_rate(30,min_total_click,max_total_click)


# In[138]:


def note_rate(note,min_note,max_note):
    if(note>max_note):
        return (((note*100)/max_note)-100)
    elif (note<min_note):
        return (((100*note)/min_note)-100)
    else:
        return 0


# In[356]:


note_rate(30,min_note,max_note)


# In[128]:


def mod_rate(modd,min_mod_num,max_mod_num):
    if(modd>max_mod_num):
        return (((modd*100)/max_mod_num)-100)
    elif (modd<min_mod_num):
        return (((100*modd)/min_mod_num)-100)
    else:
        return 0


# In[354]:


mod_rate(2,min_mod_num,max_mod_num)


# In[398]:


click=int(sys.argv[1])
time=int(sys.argv[2])
nbr_mod=int(sys.argv[3])
Note=int(sys.argv[4])
if  ((time_rate(time,min_time,max_time)<-30)and
    (click_rate(click,min_total_click,max_total_click)<20)
    and(mod_rate(nbr_mod,min_mod_num,max_mod_num)>30)and
    (note_rate(Note,min_note,max_note)>20)):
    print("This student is very engaged in this Quiz")
elif((mod_rate(nbr_mod,min_mod_num,max_mod_num)<15)):
    print("Low engagement Rate you should suggest more modules to this Student to make him more Interactive")
elif((time_rate(time,min_time,max_time)<-30)and
    (click_rate(click,min_total_click,max_total_click)<20)
    and(mod_rate(nbr_mod,min_mod_num,max_mod_num)>20)and
    (note_rate(Note,min_note,max_note)<20)):
    print("This Student is Frustrated  He should review the courses once More!")
elif((time_rate(time,min_time,max_time)>30)and
    (click_rate(click,min_total_click,max_total_click)<50)
    and(note_rate(Note,min_note,max_note)>30)):
    print("This Student is Probably Cheating!")
else:
    print("Normal Bahevior")


# In[ ]:




