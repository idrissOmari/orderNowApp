package fr.omatech.ordernow.service;

import fr.omatech.ordernow.service.dto.MenuDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.omatech.ordernow.domain.Menu}.
 */
public interface MenuService {

    /**
     * Save a menu.
     *
     * @param menuDTO the entity to save.
     * @return the persisted entity.
     */
    MenuDTO save(MenuDTO menuDTO);

    /**
     * Get all the menus.
     *
     * @return the list of entities.
     */
    List<MenuDTO> findAll();

    /**
     * Get the "id" menu.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MenuDTO> findOne(Long id);

    /**
     * Delete the "id" menu.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
