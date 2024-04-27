using Angular_Project.Models;
using Microsoft.EntityFrameworkCore;


namespace Angular_Project.Repository
{
    public class GenericRepository<TEntity> where TEntity : class
    {
        AppleStoreContext db;

        public GenericRepository(AppleStoreContext db)
        {
            this.db = db;
        }

        public List<TEntity> GetAll()
        {
            return db.Set<TEntity>().ToList();
        }

        public TEntity GetById(int id)
        {
            return db.Set<TEntity>().Find(id);
        }
        
        public void Insert(TEntity entity)
        {
            db.Set<TEntity>().Add(entity);
   
        }

        public void Update(TEntity entity)
        {
            db.Entry(entity).State = EntityState.Modified;
    
        }

        public void Delete(int id)
        {
            TEntity entity = db.Set<TEntity>().Find(id);
            db.Set<TEntity>().Remove(entity);
       
        }

        public void Save()
        {
            db.SaveChanges();
        }   
    }
}