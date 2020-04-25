package fr.omatech.ordernow.web.rest;

import fr.omatech.ordernow.service.RestaurantTableService;
import fr.omatech.ordernow.web.rest.errors.BadRequestAlertException;
import fr.omatech.ordernow.service.dto.RestaurantTableDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.omatech.ordernow.domain.RestaurantTable}.
 */
@RestController
@RequestMapping("/api")
public class RestaurantTableResource {

    private final Logger log = LoggerFactory.getLogger(RestaurantTableResource.class);

    private static final String ENTITY_NAME = "restaurantTable";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RestaurantTableService restaurantTableService;

    public RestaurantTableResource(RestaurantTableService restaurantTableService) {
        this.restaurantTableService = restaurantTableService;
    }

    /**
     * {@code POST  /restaurant-tables} : Create a new restaurantTable.
     *
     * @param restaurantTableDTO the restaurantTableDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new restaurantTableDTO, or with status {@code 400 (Bad Request)} if the restaurantTable has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/restaurant-tables")
    public ResponseEntity<RestaurantTableDTO> createRestaurantTable(@RequestBody RestaurantTableDTO restaurantTableDTO) throws URISyntaxException {
        log.debug("REST request to save RestaurantTable : {}", restaurantTableDTO);
        if (restaurantTableDTO.getId() != null) {
            throw new BadRequestAlertException("A new restaurantTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RestaurantTableDTO result = restaurantTableService.save(restaurantTableDTO);
        return ResponseEntity.created(new URI("/api/restaurant-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /restaurant-tables} : Updates an existing restaurantTable.
     *
     * @param restaurantTableDTO the restaurantTableDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated restaurantTableDTO,
     * or with status {@code 400 (Bad Request)} if the restaurantTableDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the restaurantTableDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/restaurant-tables")
    public ResponseEntity<RestaurantTableDTO> updateRestaurantTable(@RequestBody RestaurantTableDTO restaurantTableDTO) throws URISyntaxException {
        log.debug("REST request to update RestaurantTable : {}", restaurantTableDTO);
        if (restaurantTableDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RestaurantTableDTO result = restaurantTableService.save(restaurantTableDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, restaurantTableDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /restaurant-tables} : get all the restaurantTables.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of restaurantTables in body.
     */
    @GetMapping("/restaurant-tables")
    public List<RestaurantTableDTO> getAllRestaurantTables() {
        log.debug("REST request to get all RestaurantTables");
        return restaurantTableService.findAll();
    }

    /**
     * {@code GET  /restaurant-tables/:id} : get the "id" restaurantTable.
     *
     * @param id the id of the restaurantTableDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the restaurantTableDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/restaurant-tables/{id}")
    public ResponseEntity<RestaurantTableDTO> getRestaurantTable(@PathVariable Long id) {
        log.debug("REST request to get RestaurantTable : {}", id);
        Optional<RestaurantTableDTO> restaurantTableDTO = restaurantTableService.findOne(id);
        return ResponseUtil.wrapOrNotFound(restaurantTableDTO);
    }

    /**
     * {@code DELETE  /restaurant-tables/:id} : delete the "id" restaurantTable.
     *
     * @param id the id of the restaurantTableDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/restaurant-tables/{id}")
    public ResponseEntity<Void> deleteRestaurantTable(@PathVariable Long id) {
        log.debug("REST request to delete RestaurantTable : {}", id);
        restaurantTableService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
