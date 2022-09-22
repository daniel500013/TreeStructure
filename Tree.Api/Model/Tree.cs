using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tree.Api.Model
{
    public class Tree
    {
        [Key]
        public int TreeID { get; set; }
        public string Name { get; set; }

        public int? ParentID { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(ParentID))]
        public virtual Tree? TreeProp { get; set; }
    }
}
