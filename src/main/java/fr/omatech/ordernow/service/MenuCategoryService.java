package fr.omatech.ordernow.service;

import fr.omatech.ordernow.service.dto.MenuCategoryDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.omatech.ordernow.domain.MenuCategory}.
 */
public interface MenuCategoryService {

    /**
     * Save a menuCategory.
     *
     * @param menuCategoryDTO the entity to save.
     * @return the persisted entity.
     */
    MenuCategoryDTO save(MenuCategoryDTO menuCategoryDTO);

    /**
     * Get all the menuCategories.
     *
     * @return the list of entities.
     */
    List<MenuCategoryDTO> findAll();

    /**
     * Get the "id" menuCategory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MenuCategoryDTO> findOne(Long id);

    /**
     * Delete the "id" menuCategory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
