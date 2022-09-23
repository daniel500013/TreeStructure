using Tree.Api.Dto;
using Tree.Api.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace Tree.Api.Service
{
    public class TreeService
    {
        private readonly TreeDbContext _dbContext;

        public TreeService(TreeDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Model.Tree> Get()
        {
            var data = _dbContext.Tree.ToList();

            if (data.Count > 0)
                data.RemoveAt(0);

            return data;
        }

        public TreeViewModel Add(TreeDto treeDto)
        {
            if (treeDto is null)
            {
                throw new ArgumentNullException(nameof(treeDto));
            }

            if (treeDto.Name.Length <= 0)
            {
                throw new ArgumentException("Invalid name");
            }

            var newTree = new Model.Tree()
            {
                Name = treeDto.Name,
                ParentID = treeDto.ParentID
            };

            _dbContext.Tree.Add(newTree);
            _dbContext.SaveChanges();

            return new TreeViewModel() { TreeID = newTree.TreeID, Name = newTree.Name };
        }

        public void Update(TreeDto treeDto)
        {
            if (treeDto is null)
            {
                throw new ArgumentNullException(nameof(treeDto));
            }

            if (treeDto.Name.Length <= 0)
            {
                throw new ArgumentException("Invalid name");
            }

            var treeProp = _dbContext.Tree.FirstOrDefault(x => x.TreeID == treeDto.TreeID);

            if (treeProp is null)
            {
                throw new ArgumentNullException("Invalid Tree ID");
            }

            treeProp.Name = treeDto.Name;
            treeProp.ParentID = treeDto.ParentID;

            _dbContext.Tree.Update(treeProp);
            _dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentOutOfRangeException("Invalid ID");
            }

            var tree = _dbContext.Tree
                .Include(x => x.TreeProp)
                .FirstOrDefault(x => x.TreeID == id);

            if (tree is null)
            {
                throw new ArgumentNullException("Invalid Tree ID");
            }
            RemoveChildren(tree);
            //_dbContext.Tree.Remove(tree);
            _dbContext.SaveChanges();
        }

        private void RemoveChildren(Model.Tree tree)
        {
            if (tree.TreeProp != null)
            {
                var children = _dbContext.Tree
                    .Include(x => x.TreeProp)
                    .Where(x => x.ParentID == tree.TreeID);

                foreach (var child in children)
                {
                    RemoveChildren(child);
                }
            }

            _dbContext.Remove(tree);
        }
    }
}
